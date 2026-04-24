from manim import *

class Gravitation(Scene):
    def construct(self):
        self.camera.frame_width = 22
        self.camera.frame_height = 22 * 9 / 16
        title = Text("Das 2. Keplersche Gesetz (Flächensatz)").to_edge(UP)
        self.play(Write(title))

        # Sun
        sun = Dot(color=YELLOW, radius=0.4).shift(LEFT * 2)
        sun_label = Text("Sonne", color=YELLOW, font_size=24).next_to(sun, DOWN, buff=0.5)
        self.play(FadeIn(sun), Write(sun_label))

        # Elliptical orbit
        orbit = Ellipse(width=8, height=5, color=GRAY).shift(LEFT * 0.5)
        self.play(Create(orbit))

        # Planet
        planet = Dot(color=BLUE, radius=0.2)
        planet.move_to(orbit.point_from_proportion(0))

        tracker = ValueTracker(0)

        sun.move_to(LEFT * 3.12)
        sun_label.next_to(sun, DOWN, buff=0.5)

        planet.add_updater(lambda m: m.move_to(orbit.point_from_proportion((tracker.get_value() % 1))))
        
        # A line connecting sun and planet
        radius_vector = always_redraw(lambda: Line(sun.get_center(), planet.get_center(), color=GREEN))

        self.play(FadeIn(planet), Create(radius_vector))

        def kepler_rate(t):
            return t - 0.15 * np.sin(2 * PI * t)

        self.play(
            tracker.animate.set_value(1),
            run_time=6,
            rate_func=kepler_rate
        )

        planet.clear_updaters()
        
        # Explain the area law
        expl = Text("Gleiche Flächen in gleicher Zeit!", color=WHITE, font_size=32).move_to(DOWN * 4)
        self.play(Write(expl))
        self.wait(2)