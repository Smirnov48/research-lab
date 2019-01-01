
snowflakes = {}

function love.draw()
	if (table.getn(snowflakes) < 300) then
		s = math.random(6)
		snowflake = {
			x = math.random(love.graphics.getWidth()),
			y = -math.random(love.graphics.getHeight()),
			size = s,
			speed = 1 + s/6
		}
		table.insert(snowflakes, snowflake);
	end
	for i=1, table.getn(snowflakes) do
		snowflake = snowflakes[i]
		snowflake.y = snowflake.y + snowflake.speed

		if snowflake.y > love.graphics.getHeight() then
			snowflake.x = math.random(love.graphics.getWidth())
			snowflake.y = -math.random(love.graphics.getHeight())
			snowflake.size = math.random(6)
			snowflake.speed = 1 + snowflake.size/6
		end

		love.graphics.rectangle("fill", snowflake.x, snowflake.y, snowflake.size, snowflake.size)
	end
end
