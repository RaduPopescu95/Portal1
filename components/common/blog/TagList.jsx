const TagList = () => {
  const tagContent = [
    { id: 1, name: "Apartment" },
    { id: 2, name: "Real Estate" },
    { id: 3, name: "Estate" },
    { id: 4, name: "Luxury" },
    { id: 5, name: "Real" },
  ];
  return (
    <ul className="tag_list">
      {tagContent.map((item) => (
        <li className="list-inline-item" key={item.id}>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
