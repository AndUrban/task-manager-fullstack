/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true // mantém suporte ao styled-components
  },

  reactStrictMode: true,
  swcMinify: true,

  // ativa suporte a pipeline CSS Modules e suporte a importação de CSS global
  experimental: {
    css: true,
    esmExternals: true, // evita conflito com postcss/autoprefixer
  },
};

export default nextConfig;
