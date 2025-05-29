import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/infra/shared/either";
import { uploadFileToStorage } from "@/storage/upload-file-to-storage";
import { stringify } from "csv-stringify";

type ExportLinksOutput = {
  reportUrl: string
};

export async function exportLinks(): Promise<Either<never, ExportLinksOutput>> {
  const { sql, params } = db
    .select({
      id: schema.links.id,
      shortUrl: schema.links.shortUrl,
      originalUrl: schema.links.originalUrl,
      accessCount: schema.links.accessCount,
    })
    .from(schema.links)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'short_url', header: 'Short URL' },
      { key: 'original_url', header: 'Original URL' },
      { key: 'access_count', header: 'Access Count' }
    ]
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: Buffer[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      }
    }),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    fileName: `${new Date().toISOString()}-links-report.csv`,
    contentType: 'text/csv',
    folder: 'downloads',
    contentStream: uploadToStorageStream
  })

  const [{ url }] = await Promise.all([
    uploadToStorage,
    convertToCSVPipeline,
  ])

  return makeRight({ reportUrl: url });
}
