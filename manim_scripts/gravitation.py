from manim import *

class Gravitation(Scene):
    def construct(self):
        self.camera.frame_width = 22
        title = Text("Das 2. Keplersche Gesetz (Flächensatz)").to_edge(UP)
        self.play(Write(title))

        # Sun
        sun = Dot(color=YELLOW, radius=0.4).shift(LEFT * 2)
        sun_label = Text("Sonne", color=YELLOW, font_size=20).next_to(sun, DOWN)
        self.play(FadeIn(sun), Write(sun_label))

        # Elliptical orbit
        orbit = Ellipse(width=8, height=5, color=GRAY).shift(LEFT * 0.5)
        self.play(Create(orbit))

        # Planet
        planet = Dot(color=BLUE, radius=0.2)
        planet.move_to(orbit.point_from_proportion(0))

        # We will use ValueTracker to animate the planet along the path
        # In Kepler's second law, it moves faster when closer to the sun.
        # This is a simplified visual approximation.
        tracker = ValueTracker(0)

        def get_planet_pos():
            t = tracker.get_value()
            # Non-linear time mapping to simulate faster movement near perihelion
            # Perihelion is at proportion 0 (right side, x=3.5).
            # Wait, sun is at LEFT*2. So left side is perihelion.
            # Let's adjust so sun is at one of the foci.
            # Focus of ellipse w=8, h=5. c = sqrt(4^2 - 2.5^2) = sqrt(16 - 6.25) = 3.12
            # Let's place sun at LEFT * 3.12
            pass
            
        sun.move_to(LEFT * 3.12)
        sun_label.next_to(sun, DOWN)

        planet.add_updater(lambda m: m.move_to(orbit.point_from_proportion((tracker.get_value() % 1))))
        
        # A line connecting sun and planet
        radius_vector = always_redraw(lambda: Line(sun.get_center(), planet.get_center(), color=GREEN))

        self.play(FadeIn(planet), Create(radius_vector))

        # Animate planet with variable speed
        # Rate function that makes it fast near 0.5 (left side) and slow near 0/1 (right side)
        def kepler_rate(t):
            # A rough approximation: faster when angle is near PI
            # We just want a visual representation
            return t - 0.15 * np.sin(2 * PI * t)

        self.play(
            tracker.animate.set_value(1),
            run_time=6,
            rate_func=kepler_rate
        )

        planet.clear_updaters()
        
        # Explain the area law
        expl = Text("Gleiche Flächen in gleicher Zeit!", color=WHITE, font_size=24).move_to(DOWN * 3)
        self.play(Write(expl))
        self.wait(2)
