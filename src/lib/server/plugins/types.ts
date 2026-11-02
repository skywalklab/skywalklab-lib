export interface SkywalkVitePluginConfig {
  server?: { fs?: { allow: string[] } };
  css?: {
    transformer: "lightningcss" | "postcss";
    modules: {
      generateScopedName: string;
    };

    lightningcss?: {
      cssModules: {
        pattern: string;
      };
    };
  };

  resolve?: {
    alias: {
      [key: string]: string;
    };
  };
}

export type PluginOption = {
  name: string;
  apply?: "build" | "serve";
  enforce?: "pre" | "post";
  config?: (config: SkywalkVitePluginConfig, options: { command: "build" | "serve" }) => SkywalkVitePluginConfig;
  configResolved?: (config: SkywalkVitePluginConfig) => void;
  configureServer?: (server: any) => (() => void) | void | Promise<(() => void) | void>;
  buildStart?: () => void;
  resolveId?: (source: string, importer?: string) => void | string;
  load?: (id: string, options: { ssr?: boolean } | undefined) => void;
  transform?: (src: string, id: string, options: { ssr?: boolean } | undefined) => void;
  buildEnd?: () => void;
  closeBundle?: () => void;
};

export interface SkywalkPluginsProps {
  debug: boolean;
  cwd: string;
}
