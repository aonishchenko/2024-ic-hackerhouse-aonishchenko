import { useState } from "react";
import NfidLogin from "./components/NfidLogin";

function App() {
  const [backendActor, setBackendActor] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [sentimentResult, setSentimentResult] = useState(null);



  function handleSubmitUserProfile(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    backendActor.setUserProfile(name).then((response) => {
      if (response.ok) {
        setUserId(response.ok.id.toString());
        setUserName(response.ok.name);
      } else if (response.err) {
        setUserId(response.err);
      } else {
        console.error(response);
        setUserId("Unexpected error, check the console");
      }
    });
    return false;
  }

  function handleOutcall_ai_model_for_sentiment_analysis(event) {
    event.preventDefault();
    const text4analysis = event.target.elements.text4analysis.value;
    backendActor
      .outcall_ai_model_for_sentiment_analysis(text4analysis)
      .then((response) => {
        if (response.ok) {
          setSentimentResult(response.ok.result);
        } else if (response.err) {
          setSentimentResult(response.err);
        } else {
          console.error(response);
          setSentimentResult("Unexpected error, check the console");
        }
      });
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <h1>Welcome to IC AI Hacker House!</h1>
      {!backendActor && (
        <section id="nfid-section">
          <NfidLogin setBackendActor={setBackendActor}></NfidLogin>
        </section>
      )}
      {backendActor && (
        <>
          <form action="#" onSubmit={handleSubmitUserProfile}>
            <label htmlFor="name">Enter your name: &nbsp;</label>
            <input id="name" alt="Name" type="text" />
            <button type="submit">Save</button>
          </form>
          {userId && <section className="response">{userId}</section>}
          {userName && <section className="response">{userName}</section>}
        </>
      )}
      {backendActor && (
        <>
          <form
            action="#"
            onSubmit={handleOutcall_ai_model_for_sentiment_analysis}
          >
            <label htmlFor="name">
              Enter your text for sentiment analysis: &nbsp;
            </label>
            <input id="text4analysis" alt="Text4Analysis" type="text" />
            <button type="submit">Get Result</button>
          </form>
          <section id="sentiment_analysis">
            {sentimentResult && <div>{JSON.stringify(sentimentResult)}</div>}
          </section>
        </>
      )}
    </main>
  );
}

export default App;
