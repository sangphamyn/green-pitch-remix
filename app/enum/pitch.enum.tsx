export type GetAllServices = {
  id: number;
  name: string;
};
export type CreateGroupPitch = {
  id: number;
  name: string;
  id_district: number;
  id_ward: number;
  address_detail: string;
  map: string;
  description: string;
  ownerId: number;
};
