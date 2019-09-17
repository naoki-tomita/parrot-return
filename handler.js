module.exports = (e, context) => {
  console.log(e);
  console.log(context);
  const result = {
      status: 'Hello Serverless',
  };

  context.status(200).succeed(result);
};
