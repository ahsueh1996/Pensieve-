function TestJSONEnvVariable() {

  return (
    <>
      <h2>Test JSON Environment Variable</h2>
      <h3>{import.meta.env.VITE_BACALHAU_PAYLOAD}</h3>
    </>
  )
}

export default TestJSONEnvVariable
