const openRoutes =  process.env.NODE_ENV === 'production' ?
['/eco-allies/login', '/eco-allies/register', '/eco-allies/about', '/eco-allies/faq', '/eco-allies/gallery', '/eco-allies/contact']
:
['/login', '/register', '/about', '/faq', '/gallery', '/contact'];
export { openRoutes };