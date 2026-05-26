from manim import *
import random


class WaermelehreTeilchen(Scene):
    def construct(self):
        self.camera.frame_width = 26
        self.camera.frame_height = 26 * 9 / 16

        title = Text("Temperatur = Teilchenbewegung", font_size=44).to_edge(UP, buff=0.45)
        self.play(Write(title))

        cold_center = LEFT * 4 + DOWN * 0.8
        hot_center = RIGHT * 4 + DOWN * 0.8

        box_cold = Rectangle(width=4, height=4, color=BLUE).move_to(cold_center)
        box_hot = Rectangle(width=4, height=4, color=RED).move_to(hot_center)

        cold_text = Text("Kalt (wenig Bewegung)", color=BLUE, font_size=28).next_to(box_cold, UP, buff=0.45)
        hot_text = Text("Heiß (viel Bewegung)", color=RED, font_size=28).next_to(box_hot, UP, buff=0.45)

        self.play(Create(box_cold), Create(box_hot), Write(cold_text), Write(hot_text))

        cold_dots = VGroup(*[
            Dot(color=BLUE, radius=0.15).move_to(
                cold_center + RIGHT * random.uniform(-1.5, 1.5) + UP * random.uniform(-1.5, 1.5)
            )
            for _ in range(40)
        ])
        hot_dots = VGroup(*[
            Dot(color=RED, radius=0.15).move_to(
                hot_center + RIGHT * random.uniform(-1.5, 1.5) + UP * random.uniform(-1.5, 1.5)
            )
            for _ in range(40)
        ])

        self.play(FadeIn(cold_dots), FadeIn(hot_dots))

        def update_cold(mobs, dt):
            for dot in mobs:
                dot.shift((RIGHT * random.uniform(-0.5, 0.5) + UP * random.uniform(-0.5, 0.5)) * dt)

        def update_hot(mobs, dt):
            for dot in mobs:
                dot.shift((RIGHT * random.uniform(-12, 12) + UP * random.uniform(-12, 12)) * dt)

        cold_dots.add_updater(update_cold)
        hot_dots.add_updater(update_hot)

        self.play(
            box_hot.animate.stretch_to_fit_width(5.8).stretch_to_fit_height(5.1).move_to(hot_center),
            hot_text.animate.next_to(hot_center + UP * 2.55, UP, buff=0.25),
            run_time=2.4,
        )
        self.wait(3)

        cold_dots.clear_updaters()
        hot_dots.clear_updaters()

        info = Text("Mehr Wärme = mehr Platzbedarf (Ausdehnung)", color=YELLOW, font_size=32).move_to(DOWN * 5.6)
        self.play(Write(info))
        self.wait(2)
