import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";
import { aspectRatio } from "@twind/aspect-ratio";

export default {
  selfURL: import.meta.url,
  theme: {
    colors: {
      white: colors.white,
      gray: colors.trueGray,
      blue: colors.blue,
      grayellow: colors.warmGray,
      orange: colors.orange,
    },
  },
  plugins: {
    aspect: aspectRatio,
  },
} as Options;
