/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: { appDir: true },
  webpack(config) {
    // config.experiments = { topLevelAwait: true };
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    // config.module.rules.push({
    //   test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    //   use: {
    //     loader: "url-loader",
    //     options: {
    //       limit: 100000,
    //     },
    //   },
    // });

    return config;
  },
  images: {
    domains: ["kitsuden.infura-ipfs.io"],
  },
};
