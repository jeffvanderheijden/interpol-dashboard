import React from 'react';
import SEO from './../components/SEO';

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <div className="text-center">
      <h1 className="text-2xl font-semibold">NOT FOUND</h1>
      <p className="mt-5">You just hit a route that doesn't exist... the sadness.</p>
    </div>
  </>
);

export default NotFoundPage;
