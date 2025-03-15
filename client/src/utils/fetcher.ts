import NProgress from 'nprogress';

export const fetcher = async <T>(url:string):Promise<T> => {
      NProgress.start();
     try {
      const response = await fetch(url, {
        headers:{
            'Authorization':'Bearer '+localStorage.getItem('token')
        }
    });
    const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || 'An unexpected error occurred');
  }
  return data;
     } finally {
      NProgress.done();
     }
};