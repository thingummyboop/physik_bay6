from manim import *

class WellenArten(Scene):
    def construct(self):
        self.camera.frame_width = 22
        self.camera.frame_height = 22 * 9 / 16
        title = Text("Transversalwelle vs. Longitudinalwelle").to_edge(UP)
        self.play(Write(title))

        t_label = Text("Transversalwelle (z.B. Licht)", font_size=28, color=BLUE).move_to(UP * 2.5 + LEFT * 4)
        self.play(Write(t_label))

        t_axes = Axes(
            x_range=[0, 10, 1], y_range=[-1.5, 1.5, 1],
            x_length=10, y_length=2,
            axis_config={"include_numbers": False, "color": GRAY}
        ).move_to(UP * 1)

        tracker = ValueTracker(0)

        t_wave = always_redraw(
            lambda: t_axes.get_graph(
                lambda x: np.sin(2 * x - tracker.get_value() * 3),
                color=BLUE
            )
        )
        self.play(FadeIn(t_axes), Create(t_wave))

        l_label = Text("Longitudinalwelle (z.B. Schall)", font_size=28, color=GREEN).move_to(DOWN * 1 + LEFT * 4)
        self.play(Write(l_label))

        lines = VGroup()
        for i in range(50):
            line = Line(DOWN * 0.8, UP * 0.8, color=GREEN)
            line.x_base = -5 + i * 0.2
            line.move_to(RIGHT * line.x_base + DOWN * 3)
            lines.add(line)

        def update_lines(mobs):
            for i, line in enumerate(mobs):
                displacement = 0.4 * np.sin(2 * line.x_base - tracker.get_value() * 3)
                line.move_to(RIGHT * (line.x_base + displacement) + DOWN * 3)

        lines.add_updater(update_lines)
        self.play(FadeIn(lines))

        self.play(tracker.animate.set_value(5), run_time=5, rate_func=linear)
        lines.clear_updaters()