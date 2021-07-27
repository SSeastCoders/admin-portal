export interface User {
  id: number;
  role: {
    id: number;
    title: string;
  };
  firstName: string;
  lastName: string;
  username: string;

  phone: string;
  isActive: boolean;
}

// "pageable": {
//   "sort": {
//       "unsorted": true,
//       "sorted": false,
//       "empty": true
//   },
//   "offset": 0,
//   "pageNumber": 0,
//   "pageSize": 20,
//   "paged": true,
//   "unpaged": false
// },
// "last": false,
// "totalPages": 2,
// "totalElements": 30,
// "size": 20,
// "number": 0,
// "sort": {
//   "unsorted": true,
//   "sorted": false,
//   "empty": true
// },
// "first": true,
// "numberOfElements": 20,
// "empty": false
