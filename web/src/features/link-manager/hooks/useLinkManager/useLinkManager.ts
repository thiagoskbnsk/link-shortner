import { useContext } from 'react';
import { LinkManagerContext } from '../../providers/LinkManagerProvider/LinkManagerProvider';
import axios from 'axios';

export const useLinkManager = () => {
  const { links, setLinks } = useContext(LinkManagerContext);

  const increaseAccessCounter = async (id: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, accessCount: link.accessCount + 1 } : link
      )
    );
  }

  const addLink = async (originalUrl: string, shortUrl: string): Promise<{error?: string} | undefined> => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/links`, {
        originalUrl,
        shortUrl,
      })
      .then(response => response.data)
      .catch(error => {
        return error.response.data
      })

    if (response?.message) {
      return {
        error: response.message
      }
    }

    setLinks((prevLinks) => [response, ...prevLinks]);
  };

  const removeLink = async (id: string) => {
    const {status} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/links/${id}`)

    if (status === 204) {
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    }
  };

  const copyLink = (id: string) => {
    const link = links.find((link) => link.id === id);

    if (link) {
      navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/${link.shortUrl}`).then(
        () => console.log('Link copied to clipboard'),
        (err) => console.error('Failed to copy link: ', err)
      );
    }
  };

  const getLinks = async () => {
    const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/links`);

    setLinks(data)
  }

  const getLinkByShortUrl = async (shortUrl: string) => {
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/links/${shortUrl}`).then(response => response.data).catch(error => null);
  }

  const downloadCSV = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/links/export`)
      .then(response => response.data)
      .catch(error => error.response.data)
    
    if (response?.message) {
      return {
        error: response.message
      }
    }

    window.open(response.reportUrl, '_blank'); 
  }

  return {
    addLink,
    removeLink,
    copyLink,
    links,
    increaseAccessCounter,
    getLinks,
    getLinkByShortUrl,
    downloadCSV
  };
};