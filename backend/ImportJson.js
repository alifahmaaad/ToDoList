const { default: swaggerFile } = await import("./package.json", {
  assert: {
    type: "json",
  },
});
export default { swaggerFile };
