import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

function textFromChildren(children = []) {
  return children.map((child) => child.text || "").join("");
}

function renderSpan(child, markDefs = []) {
  let content = child.text || "";
  const marks = child.marks || [];

  marks.forEach((mark) => {
    if (mark === "strong") content = <strong>{content}</strong>;
    if (mark === "em") content = <em>{content}</em>;
    const linkDef = markDefs.find((def) => def._key === mark && def.href);
    if (linkDef) {
      content = (
        <a href={linkDef.href} rel="noopener noreferrer">
          {content}
        </a>
      );
    }
  });

  return content;
}

function renderBlock(block) {
  const children = block.children || [];
  const content = children.map((child) => (
    <span key={child._key || child.text}>{renderSpan(child, block.markDefs)}</span>
  ));

  if (block.listItem === "bullet") return <li>{content}</li>;
  if (block.listItem === "number") return <li>{content}</li>;
  if (block.style === "h2") return <h2>{content}</h2>;
  if (block.style === "h3") return <h3>{content}</h3>;
  if (block.style === "blockquote") return <blockquote>{content}</blockquote>;

  const text = textFromChildren(children);
  if (!text.trim()) return null;
  return <p>{content}</p>;
}

function renderImage(block) {
  const src =
    block.finalUri ||
    block?.image?.asset?.url ||
    (block.image ? urlFor(block.image)?.width(900).height(560).url() : null);
  if (!src) return null;
  return (
    <figure className="my-4">
      <Image
        src={src}
        alt={block.alt || block.caption || "Imagine"}
        width={900}
        height={560}
        className="img-fluid w-100 cover"
      />
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
  );
}

export default function PortableContent({ value, className = "" }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  return (
    <div className={className}>
      {value.map((block) => {
        if (block._type === "imageWithAlt") {
          return <div key={block._key}>{renderImage(block)}</div>;
        }
        return <div key={block._key}>{renderBlock(block)}</div>;
      })}
    </div>
  );
}
