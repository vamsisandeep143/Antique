import React, { useOutlet, useEffect, useState } from "react";
import { useOutletContext } from 'react-router-dom';

const DescriptionInfo = () => {

  const filteredItem = useOutletContext();

  console.log(filteredItem);
 

  return (
    <div>
{filteredItem?.txtVal?.description}

    </div>
  )
}

export default DescriptionInfo