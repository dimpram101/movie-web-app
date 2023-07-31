const sliceData = (data, chunkSize = 5) => {
  const slicedData = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    slicedData.push(chunk);
  }

  return slicedData;
};

export default sliceData;