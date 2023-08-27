interface IAnswerItemProps {
  scientificName: string;
  commonName: string;
}

const AnswerItem: React.FC<IAnswerItemProps> = ({
  scientificName,
  commonName,
}) => {
  return (
    <div className="rounded-md w-full h-full bg-secondary hover:bg-primary flex flex-col justify-center items-center text-primary hover:text-secondary">
      <p className="text-lg font-bold">{scientificName}</p>
      {commonName!== "" ? <p className="text-lg italic">({commonName})</p> : <></>}
    </div>
  );
};

export default AnswerItem;
