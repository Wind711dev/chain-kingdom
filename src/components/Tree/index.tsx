import TreePng from '../../assets/object/tree.png';
export default function Tree({ className }: { className: string }) {
  return <img className={`absolute w-[50px] ${className}`} src={TreePng} alt='tree' />;
}
