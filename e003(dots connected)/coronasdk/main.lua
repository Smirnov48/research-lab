-----------------------------------------------------------------------------------------
--
-- main.lua
--
-----------------------------------------------------------------------------------------

countPoints = 19
points = {}
lines = {}

figure = {}

local step = math.pi * 2 / 19
for i = 1, countPoints do 
	local x = math.cos(i * step) * 100 + display.contentWidth / 2
	local y = math.sin(i * step) * 100 + display.contentHeight / 2

	points[i] = {
		x = x,
		y = y,
		vx = math.random(3) + 1,
		vy = math.random(3) + 1,
		rect = display.newRect( x, y, 10, 10 ),
		lines = {}
	}
	table.insert(figure, { x = x, y = y })
end

function addMorePoints(x, y) 
	x = display.contentWidth / 2 + x 
	y = display.contentHeight / 2  + y
	table.insert(figure, { x = x, y = y })
end

addMorePoints( - 60, - 135)
addMorePoints( 60, - 135)

addMorePoints(-40, -30)
addMorePoints(36, -30)

for i = 1, countPoints do 
	local p1 = points[i]

	for j = 1, countPoints do
		if i ~= j then
			local p2 = points[j]

			local ln = {
				line = display.newLine( p1.x, p1.y, p2.x, p2.y ),
				p1 = p1,
				p2 = p2
			}

			local dx = ln.p1.x - ln.p2.x
			local dy = ln.p1.y - ln.p2.y
			local dist = math.sqrt(dx * dx + dy * dy)

			ln.line.strokeWidth = 3 * (1 - dist / 200)
			ln.line:setStrokeColor( 1, 1, 1, 1 - dist / 200 )

			table.insert(points[i].lines, ln)
		end
	end
end 

stop = false

local function gameLoop()
	for i = 1, countPoints do 
		point = points[i]
		if not stop then
			point.x = point.x + point.vx
			point.y = point.y + point.vy
		else 
--[[			if (
				 (point.x - figure[i].x) > 1 and 
				 (point.y - figure[i].y) > 1) 
			then]]
				point.x = point.x + (figure[i].x - point.x) / 16
				point.y = point.y + (figure[i].y - point.y) / 16
--			end
		end

		if (point.x > display.contentWidth or point.x < 0) then 
			point.vx = -point.vx
		end

		if (point.y > display.contentHeight or point.y < 0) then
			point.vy = -point.vy
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

function touchListener(event)
	if ( event.phase == "began" ) then
		stop = true

    elseif ( event.phase == "ended" ) then
		for i = 1, countPoints do 
			point = points[i]
			point.vx = math.random(6) - 3
			if math.abs(point.vx) < 1 then
				point.vx = math.random(2) + 1
			end
			point.vy = math.random(6) - 3
			if math.abs(point.vy) < 1 then
				point.vy = math.random(2) + 1
			end
		end
		stop = false
    end
end

display.setDefault("background", 0.75, 0.3, 0.75)
Runtime:addEventListener("enterFrame", gameLoop)
Runtime:addEventListener( "touch", touchListener )