const { default: swaggerFile } = await import("./swagger-output.json", {
  assert: {
    type: "json",
  },
});
export default { swaggerFile };
