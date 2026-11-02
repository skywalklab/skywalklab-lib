// dev-server mirror of static/_headers
export default (app) => {
  app.use("/component-shots", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use(/^\/og-image-storybook/, (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });
};
