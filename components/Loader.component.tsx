function LoaderComponent() {
  const array = Array.from(Array(10).keys());
  return (
    <div className='loader md:col-start-2'>
      {array.map((index) => (
        <span
          style={{
            rotate: `${index * 36}deg`,
          }}
          key={index}
        ></span>
      ))}
    </div>
  );
}

export default LoaderComponent;
