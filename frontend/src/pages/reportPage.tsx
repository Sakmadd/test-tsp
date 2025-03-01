// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Heading,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Container,
//   Spinner,
// } from '@chakra-ui/react';
// import api from '../network/api'; // Pastikan API ini ada
// import { OperatorReportType, OrderReportType } from '../types/orderReportType';

// export function ReportPage() {
//   const [workOrderReport, setWorkOrderReport] = useState<OrderReportType[]>([]);
//   const [operatorReport, setOperatorReport] = useState<OperatorReportType[]>(
//     []
//   );
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchReports() {
//       try {
//         const workOrderData = await api.GET_WORK_ORDER_REPORT();
//         const operatorData = await api.GET_OPERATOR_REPORT();
//         setWorkOrderReport(workOrderData);
//         setOperatorReport(operatorData);
//       } catch (error) {
//         console.error('Error fetching reports:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchReports();
//   }, []);

//   if (loading) {
//     return (
//       <Container centerContent>
//         <Spinner size="xl" />
//       </Container>
//     );
//   }

//   return (
//     <Container maxW="6xl" py={10}>
//       <Box mb={8}>
//         <Heading size="lg" mb={4}>
//           Work Order Recap Report
//         </Heading>
//         <Table variant="simple">
//           <Thead>
//             <Tr>
//               <Th>Product Name</Th>
//               <Th>Pending</Th>
//               <Th>In Progress</Th>
//               <Th>Completed</Th>
//               <Th>Canceled</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {workOrderReport.map((row) => (
//               <Tr key={row.productName}>
//                 <Td>{row.productName}</Td>
//                 <Td>{row.pending}</Td>
//                 <Td>{row.inProgress}</Td>
//                 <Td>{row.completed}</Td>
//                 <Td>{row.canceled}</Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Box>

//       <Box>
//         <Heading size="lg" mb={4}>
//           Operator Performance Report
//         </Heading>
//         <Table variant="simple">
//           <Thead>
//             <Tr>
//               <Th>Operator Name</Th>
//               <Th>Product Name</Th>
//               <Th>Completed Quantity</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {operatorReport.map((row, index) => (
//               <Tr key={index}>
//                 <Td>{row.operatorName}</Td>
//                 <Td>{row.productName}</Td>
//                 <Td>{row.completed}</Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Box>
//     </Container>
//   );
// }
