import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  TextInput,
  NumberInput,
  Select,
  Switch,
  Button,
  Group,
  Table,
  Title,
} from '@mantine/core';
import useOrderStore, { Order } from '../store/useOrderStore';

/**
 * Price list mapping each ice type to a per‑unit price. These values are
 * placeholders and should be adapted to your actual pricing or retrieved
 * from Supabase if you prefer to store them in a table.
 */
const priceList: Record<string, number> = {
  'Đá cây': 10000,
  'Đá mi': 8000,
  'Đá xay': 7000,
  'Đá cắt': 9000,
};

export default function Home() {
  const { orders, fetchOrders, addOrder } = useOrderStore();
  const [customerName, setCustomerName] = useState('');
  const [type, setType] = useState<string>('Đá cây');
  const [quantity, setQuantity] = useState<number>(1);
  const [isDebt, setIsDebt] = useState<boolean>(false);

  // Fetch existing orders once when the page mounts.
  useEffect(() => {
    // Fetch orders only if supabase credentials are provided.
    fetchOrders().catch((err) => console.error(err));
  }, [fetchOrders]);

  /**
   * Handle form submission. Calculates the price based on the selected type
   * and quantity, inserts a new record into Supabase via the store, and
   * clears the form fields on success.
   */
  const handleAddOrder = async () => {
    const pricePerUnit = priceList[type] || 0;
    const price = pricePerUnit * quantity;
    const order: Order = {
      customer_name: customerName,
      type,
      quantity,
      price,
      date: new Date().toISOString(),
      is_debt: isDebt,
    };
    await addOrder(order);
    // Reset form fields
    setCustomerName('');
    setQuantity(1);
    setType('Đá cây');
    setIsDebt(false);
  };

  /**
   * Generate table rows from the order data stored in Zustand. Each row
   * displays customer name, ice type, quantity, formatted price and debt status.
   */
  const rows = orders.map((order, index) => (
    <tr key={order.id ?? index}>
      <td>{order.customer_name}</td>
      <td>{order.type}</td>
      <td>{order.quantity}</td>
      <td>{order.price.toLocaleString()}</td>
      <td>{order.is_debt ? 'Nợ' : 'Trả tiền'}</td>
    </tr>
  ));

  return (
    <Container size="md" py="md">
      <Title order={2} mb="md">
        Quản lý đơn hàng nước đá
      </Title>
      <Paper withBorder p="md" mb="md">
        <Group grow>
          <TextInput
            label="Tên khách hàng"
            placeholder="Nhập tên khách hàng"
            value={customerName}
            onChange={(event) => setCustomerName(event.currentTarget.value)}
            required
          />
          <Select
            label="Loại đá"
            data={[
              { value: 'Đá cây', label: 'Đá cây' },
              { value: 'Đá mi', label: 'Đá mi' },
              { value: 'Đá xay', label: 'Đá xay' },
              { value: 'Đá cắt', label: 'Đá cắt' },
            ]}
            value={type}
            onChange={(value) => setType(value || 'Đá cây')}
          />
          <NumberInput
            label="Số lượng"
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(Number(value))}
            required
          />
          <Switch
            label="Khách nợ"
            checked={isDebt}
            onChange={(event) => setIsDebt(event.currentTarget.checked)}
          />
        </Group>
        <Group position="right" mt="md">
          <Button onClick={handleAddOrder}>Thêm đơn</Button>
        </Group>
      </Paper>
      <Table
        highlightOnHover
        withBorder
        horizontalSpacing="md"
        verticalSpacing="sm"
      >
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Loại đá</th>
            <th>Số lượng</th>
            <th>Thành tiền (đ)</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}
