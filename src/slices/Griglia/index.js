/**
 * @typedef {import("@prismicio/client").Content.GrigliaSlice} GrigliaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<GrigliaSlice>} GrigliaProps
 * @param {GrigliaProps}
 */
const Griglia = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for griglia (variation: {slice.variation}) Slices
    </section>
  );
};

export default Griglia;
