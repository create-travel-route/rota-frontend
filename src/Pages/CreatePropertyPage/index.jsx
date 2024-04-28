import React from 'react';
import { CreateProperty } from '../../Components';
function CreatePropertyPage({ isUpdate }) {
  return (
    <div>
      <CreateProperty isUpdate={isUpdate} />
    </div>
  );
}

export default CreatePropertyPage;
