USE smart_restaurant;

INSERT INTO users (fullname, email, phone, password, created_at) VALUES
('Demo User', 'demo@example.com', '+1-555-0100', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW());

INSERT INTO reservations (user_id, name, phone, reservation_date, reservation_time, people_count, special_request, created_at) VALUES
(1, 'Ava', '+1-555-0101', '2026-07-10', '19:30:00', 4, 'Window seat', NOW());
