import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getExpirationDuration } from '../util/auth';
import { useEffect } from 'react';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  
  useEffect(() => {
    const duration = getExpirationDuration();
    if(duration < 0) {
      submit(null, {
        method: "POST",
        action: "/logout"
      })
    }
    
    if(token) {
      setTimeout(() => {
        submit(null, {
          method: "POST",
          action: "/logout"
        })
      }, duration);
    }
  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
