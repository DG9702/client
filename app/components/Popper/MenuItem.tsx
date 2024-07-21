import React from 'react'
import Link from 'next/link';

type Props={
    data: any,
    onClick: any,  
};

const MenuItem: React.FC<Props> = ({
    data,
    onClick
}) => {
  return (    
    <>
      {data?.type==="logout"? (
        <button className="w-full text-start p-2 font-medium text-base dark:text-white text-[#666]"
          onClick={onClick}>
              {data.title}
      </button>
      ) : (
          <Link className="w-full text-start p-2 font-medium text-base dark:text-white text-[#666]"
            onClick={onClick}
            href={data?.to}
          >
                {data.title}
        </Link>
          
      )}
  </>
  )
}

export default MenuItem