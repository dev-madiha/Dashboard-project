import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";


const tableDataJSON = `
[
  {
    "id": 1,
    "name": "MacBook Pro 13”",
    "variants": "2 Variants",
    "category": "Laptop",
    "price": "$2399.00",
    "status": "Delivered",
    "time": "5min ago",
    "image": "/images/product/product-01.jpg"
  },
  {
    "id": 2,
    "name": "Apple Watch Ultra",
    "variants": "1 Variant",
    "category": "Watch",
    "price": "$879.00",
    "status": "Pending",
    "time": "4min ago",
    "image": "/images/product/product-02.jpg"
  },
  {
    "id": 3,
    "name": "iPhone 15 Pro Max",
    "variants": "2 Variants",
    "category": "SmartPhone",
    "price": "$1869.00",
    "status": "Delivered",
    "time": "3min ago",
    "image": "/images/product/product-03.jpg"
  },
  {
    "id": 4,
    "name": "iPad Pro 3rd Gen",
    "variants": "2 Variants",
    "category": "Electronics",
    "price": "$1699.00",
    "status": "Canceled",
    "time": "5min ago",
    "image": "/images/product/product-04.jpg"
  },
  {
    "id": 5,
    "name": "AirPods Pro 2nd Gen",
    "variants": "1 Variant",
    "category": "Accessories",
    "price": "$240.00",
    "status": "Delivered",
    "time": "2min ago",
    "image": "/images/product/product-05.jpg"
  }
]`
;

const tableData = JSON.parse(tableDataJSON);

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Activity
          </h3>
          <p>Latest system events and transactions</p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex flex-col items-start">
                    <Badge
                      size="sm"
                      color={
                        product.status === "Delivered"
                          ? "success"
                          : product.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {product.status}
                    </Badge>
                    {product.time && (
                      <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {product.time}
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
