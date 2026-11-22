import { Youtube } from "lucide-react";
import VideoSection from "../components/VideoSection";
import PageHead from "../components/PageHead";
import { SITE } from "../config/site";

export default function Videos() {
  return (
    <>
      <PageHead eyebrow="VIDEO & SOCIAL" title={<>Anita's work, <em>everywhere.</em></>}
        text="Real work from our studio. This list syncs with our YouTube channel, so new uploads show up on their own." />
      <section className="section top">
        <div className="wrap">
          <VideoSection limit={10} />
          <p className="center">
            <a className="gold" href={SITE.social.youtube} target="_blank" rel="noreferrer"><Youtube size={18} /> Subscribe on YouTube</a>
          </p>
        </div>
      </section>
    </>
  );
}
