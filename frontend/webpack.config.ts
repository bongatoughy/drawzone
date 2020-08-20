import { Configuration, DefinePlugin } from "webpack";
import path from "path";
import { config } from "dotenv";

config();

const webpackConfig = (): Configuration => {
  return {
    entry: path.resolve(__dirname, "src", "root.tsx"),
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
    },
    devServer: {
      contentBase: path.resolve(__dirname, "public"),
    },
    plugins: [
      new DefinePlugin({
        [`process.env.HOST`]: JSON.stringify(process.env.HOST),
      }),
    ],
  };
};

export default webpackConfig;
