export const getWordData = (id) =>
  fetch(`/assets/WordCloud_${id}.json`)
    .then((response) => {
      console.log(response)
    })
    .then(data => {
      console.log(data)
      return data
    })
