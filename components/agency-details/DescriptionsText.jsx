import PortableContent from "@/components/sanity/PortableContent";

const DescriptionsText = ({ firma }) => {
  const createMarkup = () => {
    return { __html: firma?.articleContentFirst || "" };
  };
  const createMarkupSecond = () => {
    return { __html: firma?.articleContentSecond || "" };
  };

  return (
    <>
      {Array.isArray(firma?.articleContentFirst) ? (
        <PortableContent value={firma.articleContentFirst} />
      ) : (
        <div dangerouslySetInnerHTML={createMarkup()}></div>
      )}
      {firma?.articleContentSecond?.length > 0 && (
        <div dangerouslySetInnerHTML={createMarkupSecond()}></div>
      )}
    </>
  );
};

export default DescriptionsText;
