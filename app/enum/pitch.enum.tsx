export type GetAllServices = {
  id: number;
  name: string;
};
export type GetGroupPitchById = {
  id: number;
  name: string;
};
export type CreateGroupPitch = {
  name: string;
  id_district: number;
  id_ward: number;
  address_detail: string;
  map: string;
  description: string;
  ownerId: number;
  images: string;
};
