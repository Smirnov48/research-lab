-----------------------------------------------------------------------------------------
--
-- main.lua
--
-----------------------------------------------------------------------------------------

countPoints = 20
points = {}
lines = {}

for i = 1, countPoints do 
	local x = math.random(display.contentWidth)
	local y = math.random(display.contentHeight)

	points[i] = {
		x = x,
		y = y,
		vx = math.random(3) + 1,
		vy = math.random(3) + 1,
		rect = display.newRect( x, y, 10, 10 ),
		lines = {}
	}
end

for i = 1, countPoints do 
	local p1 = points[i]

	for j = 1, countPoints do
		if i ~= j then
			local p2 = points[j]

			table.insert(points[i].lines, {
					line = display.newLine( p1.x, p1.y, p2.x, p2.y ),
					p1 = p1,
					p2 = p2
				}
			)
		end
	end
end 

display.setDefault("background", 0, 0.3, 0.3)

local function gameLoop()
	for i = 1, countPoints do 
		point = points[i]
		point.x = point.x + point.vx
		point.y = point.y + point.vy

		if (point.x > display.contentWidth or point.x < 0) then 
			point.vx = -point.vx
			point.x = point.x + point.vx
		end

		if (point.y > display.contentHeight or point.y < 0) then
			point.vy = -point.vy
			point.y = point.y + point.vy
		end

		point.rect.x = point.x
		point.rect.y = point.y
	
		for j = 1, countPoints - 1 do
			point.lines[j].line:removeSelf()
			point.lines[j].line = display.newLine( 
				point.lines[j].p1.x, 
				point.lines[j].p1.y, 
				point.lines[j].p2.x, 
				point.lines[j].p2.y 
			)

			local dx = point.lines[j].p1.x - point.lines[j].p2.x
			local dy = point.lines[j].p1.y - point.lines[j].p2.y
			local dist = math.sqrt(dx * dx + dy * dy)

			point.lines[j].line.strokeWidth = 3 * (1 - dist / 200)
			point.lines[j].line:setStrokeColor( 1, 1, 1, 1 - dist / 200 )
		end
	end
end

Runtime:addEventListener("enterFrame", gameLoop)