from manim import *

class WellenArten(Scene):
    def construct(self):
        self.camera.frame_width = 22
        title = Text("Transversalwelle vs. Longitudinalwelle").to_edge(UP)
        self.play(Write(title))

        # Transverse Wave (e.g., Light or Rope)
        t_label = Text("Transversalwelle (z.B. Licht)", font_size=24, color=BLUE).move_to(UP * 2 + LEFT * 3)
        self.play(Write(t_label))

        t_axes = Axes(
            x_range=[0, 10, 1], y_range=[-1.5, 1.5, 1],
            x_length=8, y_length=2,
            axis_config={"include_numbers": False, "color": GRAY}
        ).move_to(UP * 0.5)

        tracker = ValueTracker(0)

        t_wave = always_redraw(
            lambda: t_axes.get_graph(
                lambda x: np.sin(2 * x - tracker.get_value() * 3),
                color=BLUE
            )
        )
        self.play(FadeIn(t_axes), Create(t_wave))

        # Longitudinal Wave (e.g., Sound)
        l_label = Text("Longitudinalwelle (z.B. Schall)", font_size=24, color=GREEN).move_to(DOWN * 1.5 + LEFT * 3)
        self.play(Write(l_label))

        # A series of vertical lines representing air molecules
        # They will oscillate back and forth horizontally
        lines = VGroup()
        for i in range(40):
            line = Line(DOWN * 0.5, UP * 0.5, color=GREEN)
            line.x_base = -4 + i * 0.2
            line.move_to(RIGHT * line.x_base + DOWN * 2.5)
            lines.add(line)

        def update_lines(mobs):
            for i, line in enumerate(mobs):
                # The position oscillates horizontally based on sine wave
                displacement = 0.3 * np.sin(2 * line.x_base - tracker.get_value() * 3)
                line.move_to(RIGHT * (line.x_base + displacement) + DOWN * 2.5)

        lines.add_updater(update_lines)
        self.play(FadeIn(lines))

        self.play(tracker.animate.set_value(5), run_time=5, rate_func=linear)
        lines.clear_updaters()
