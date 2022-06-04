const mapDBToModelalbum = ({ 
    id,
    name,
    year,
    created_at,
    updated_at,
  }) => ({
    id,
    name,
    year,
    createdAt: created_at,
    updatedAt: updated_at,
  });
   
  
  const mapDBToModelsong = ({ 
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
    created_at,
    updated_at,
  }) => ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
    createdAt: created_at,
    updatedAt: updated_at,
  });

  const mapDBToModelsong3 = ({ 
    id,
    title,
    performer,
  }) => ({
    id,
    title,
    performer,
  });

  module.exports = { mapDBToModelalbum,mapDBToModelsong,mapDBToModelsong3 };