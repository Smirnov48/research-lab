package ru.smirnov48.experiments;

import java.util.ArrayList;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer.ShapeType;

public class Snowflakes extends ApplicationAdapter {

	ShapeRenderer shapeRenderer;
	
	ArrayList<Snowflake> snowflakes;
	
	@Override
	public void create () {
		shapeRenderer = new ShapeRenderer();
		
		snowflakes = new ArrayList<Snowflake>();
		
		for (int i = 0; i < 400; i++) {
			snowflakes.add(new Snowflake());
		}
	}

	@Override
	public void render () {
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

		shapeRenderer.begin(ShapeType.Filled);
		for(Snowflake snowflake: snowflakes) {
			shapeRenderer.rect(snowflake.x, snowflake.y, snowflake.size, snowflake.size);
			snowflake.update();
		}
		shapeRenderer.end();
	}
	
	@Override
	public void dispose () {
	}
}

class Snowflake {
	
	public float x;
	public float y;
	public int size;
	public float speed;
	
	public Snowflake() {
		reinit();
	}

	private void reinit() {
		x = (int) Math.floor(Math.random() * Gdx.graphics.getWidth()); 
		y = (int) Math.floor(Math.random() * Gdx.graphics.getHeight()) + Gdx.graphics.getHeight(); 
		size = (int) Math.floor(Math.random() * 6);
		speed = 1 + size / 6.0f;
	}

	public void update() {
		y -= speed;
		if (y < 0) {
			reinit();
		}
	}
}