export default {
  request: (err) => new Promise((resolve, reject) => {
    setTimeout(() => {
      return err ? reject(err) : resolve();
    }, 1000);
  }),
}
