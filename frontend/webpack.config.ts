import { Configuration } from "webpack";
import path from "path";

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
  };
};

export default webpackConfig;
