import VideoSection from "../components/VideoSection";
import { SITE } from "../config/site";

export default function Videos() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Videos</h1>
          <p className="lead">Real work from our studio. This list syncs with our YouTube channel, so new uploads show up on their own.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <VideoSection limit={10} />
          <p className="center"><a className="btn btn-ghost" href={SITE.social.youtube} target="_blank" rel="noreferrer">Subscribe on YouTube</a></p>
        </div>
      </section>
    </>
  );
}
