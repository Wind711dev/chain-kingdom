// import TreePng from '../../assets/object/tree.png';
import LandPlot from '../../assets/object/land_plot.png';

export default function Tree({ className }: { className: string }) {
  // return <img className={`absolute w-[50px] ${className}`} src={TreePng} alt='tree' />;
  return <img src={LandPlot} alt='land-plot' className='land-plot' />;
}
