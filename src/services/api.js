import fixtures from 'fixtures/HighLights.json'

const mockifyAPI = (data) => new Promise(resolve => {
  setTimeout(() => resolve({data, status: 200}), 1000)
})

export const testPromise = () => mockifyAPI(fixtures)
