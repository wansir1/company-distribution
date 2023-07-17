// useEffect(() => {
//   const resizeObserver = new ResizeObserver(() => {
//     const container = containerRef.current;
//     if (container) {
//       const { width, height } = container.getBoundingClientRect();
//       const childrenArray = React.Children.toArray(children);

//       const updatedChildren = childrenArray.map((child: Children) => {
//         if (React.isValidElement(child)) {
//           return React.cloneElement(child as React.ReactElement, {
//             style: {
//               ...child.props.style,
//               width: `${width}px`,
//               height: `${height}px`,
//             },
//           });
//         }
//       });
//       console.log('dxdxdxdx');
//       setChildren(updatedChildren);
//     }
//   });

//   containerRef.current && resizeObserver.observe(containerRef.current);

//   return () => {
//     containerRef.current && resizeObserver.unobserve(containerRef.current);
//     resizeObserver.disconnect();
//   };
// }, []);
//    const [childrenWithStyles, setChildren] = useState<Children>(children);
