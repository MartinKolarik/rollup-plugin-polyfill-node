if (Object.prototype.toString.call(process) !== '[object process]') {
  throw new Error('process should report [object process]');
}

done();
